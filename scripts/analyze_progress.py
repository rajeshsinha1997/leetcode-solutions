import os
import re
import json
import time
import requests
from pathlib import Path
from collections import defaultdict
from datetime import datetime
import matplotlib.pyplot as plt
from math import cos, sin, pi

# ---------- CONFIG ----------
REPO_PATH = "D:\\GitHub Projects\\leetcode-solutions\\solution-set-1_typescript"  # Change this if your solution folder moves
CACHE_DIR = Path(__file__).parent / "cache"
CACHE_DIR.mkdir(exist_ok=True)  # Create it if it doesn't exist
CACHE_PATH = CACHE_DIR / "leetcode_metadata_cache.json"
LEETCODE_API_URL = "https://leetcode.com/api/problems/algorithms/"
TEMPLATE_PATH = Path(__file__).parent.parent / "README.template.md"
README_PATH = Path(__file__).parent.parent / "README.md"
MISSING_DATA_DIR = Path(__file__).parent / "errors"
MISSING_DATA_DIR.mkdir(exist_ok=True)
MISSING_PROBLEMS_PATH = MISSING_DATA_DIR / "missing_problems.json"
CHART_OUTPUT_PATH = (
    Path(__file__).parent.parent / "assets" / "problem-solved-count-chart.png"
)
# ----------------------------


def extract_problem_number(filename):
    match = re.match(r"(\d+)\.", filename)
    return int(match.group(1)) if match else None


def get_problem_ids_in_repo(repo_path):
    problem_ids = set()
    for fname in os.listdir(repo_path):
        qid = extract_problem_number(fname)
        if qid:
            problem_ids.add(qid)
    return problem_ids


def fetch_leetcode_metadata(expected_ids=None):
    # Try loading from cache first
    if CACHE_PATH.exists():
        with open(CACHE_PATH, "r", encoding="utf-8") as f:
            print("📂 Loading metadata from cache...")
            cached_data = json.load(f)

            # Validate that all expected question IDs are present
            if expected_ids is None or all(
                str(qid) in cached_data for qid in expected_ids
            ):
                print("✅ Cache is valid.")
                return {int(k): v for k, v in cached_data.items()}
            else:
                print("⚠️ Cache missing some problems. Refreshing...")

    # Fetch fresh data from LeetCode
    print("🔄 Fetching metadata from LeetCode...")
    response = requests.get(LEETCODE_API_URL)
    response.raise_for_status()
    problems = response.json()["stat_status_pairs"]

    problem_map = {}
    for item in problems:
        qid = item["stat"]["frontend_question_id"]
        level = item["difficulty"]["level"]
        difficulty = {1: "easy", 2: "medium", 3: "hard"}.get(level, "unknown")
        problem_map[qid] = difficulty

    with open(CACHE_PATH, "w", encoding="utf-8") as f:
        json.dump(problem_map, f, indent=2)

    print("✅ Metadata fetched and cached.")
    return problem_map


def analyze_repo(repo_path, problem_map):
    counts = defaultdict(int)
    missing_problems = []

    for fname in os.listdir(repo_path):
        q_num = extract_problem_number(fname)
        if q_num and q_num in problem_map:
            difficulty = problem_map[q_num]
            counts[difficulty] += 1
        else:
            print(f"⚠️ Skipping '{fname}' (problem #{q_num} not found in metadata)")
            if q_num:
                missing_problems.append(q_num)

    return dict(counts), missing_problems


def print_summary(counts, label="Your Solutions"):
    print(f"\n📊 Summary of {label} by Difficulty:\n")
    for diff in ["easy", "medium", "hard"]:
        print(f"  {diff.capitalize():<6}: {counts.get(diff, 0)}")
    print()


def log_missing_problems(missing_ids):
    if not missing_ids:
        return

    print("\n❗ Missing problem metadata for the following question numbers:")
    print(", ".join(str(i) for i in sorted(missing_ids)))

    with open(MISSING_PROBLEMS_PATH, "w", encoding="utf-8") as f:
        json.dump(sorted(missing_ids), f, indent=2)

    print(f"📁 Missing problem IDs saved to: {MISSING_PROBLEMS_PATH}")


def generate_chart(easy, medium, hard, output_path):
    labels = ["Easy", "Medium", "Hard"]
    sizes = [easy, medium, hard]
    colors = ["green", "purple", "red"]

    total = sum(sizes)
    if total == 0:
        print("❌ No data to plot.")
        return

    fig, ax = plt.subplots(figsize=(6, 6))
    wedges, _ = ax.pie(
        sizes,
        startangle=90,
        counterclock=False,
        colors=colors,
        wedgeprops=dict(width=0.4, edgecolor="white"),
    )

    for i, wedge in enumerate(wedges):
        angle = (wedge.theta2 + wedge.theta1) / 2.0
        angle_rad = angle * pi / 180

        # Position for percentage (inside)
        x = 0.4 * cos(angle_rad)
        y = 0.4 * sin(angle_rad)
        pct = f"{(sizes[i] / total) * 100:.1f}%"
        ax.text(
            x,
            y,
            pct,
            ha="center",
            va="center",
            color="white",
            weight="bold",
            fontsize=12,
        )

        # Position for label (outside)
        lx = 0.85 * cos(angle_rad)
        ly = 0.85 * sin(angle_rad)
        ax.text(
            lx,
            ly,
            labels[i],
            ha="center",
            va="center",
            color="white",
            fontsize=11,
            weight="bold",
        )

    # White title
    ax.set_title(
        "LeetCode Problem Distribution", fontsize=14, weight="bold", color="white"
    )

    # Transparent background
    fig.patch.set_alpha(0)
    ax.set_facecolor("none")
    ax.set(aspect="equal")

    plt.savefig(output_path, transparent=True)
    plt.close()
    print(f"📊 Chart saved to {output_path}")


def format_row(label, count):
    return f"| {label.ljust(10)} | {str(count).zfill(2).ljust(6)} |"


def generate_readme(easy, medium, hard):
    if not TEMPLATE_PATH.exists():
        print("❌ README.template.md not found.")
        return

    today_str = datetime.today().strftime("%B %d, %Y")

    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        template = f.read()

    # Generate full rows
    easy_row = format_row("Easy", easy)
    medium_row = format_row("Medium", medium)
    hard_row = format_row("Hard", hard)

    # Remove any blank lines just before row placeholders
    template_lines = template.splitlines()
    cleaned_lines = []

    for line in template_lines:
        if line.strip() in ["{{EASY_ROW}}", "{{MEDIUM_ROW}}", "{{HARD_ROW}}"]:
            # Remove blank line if it exists just before
            if cleaned_lines and cleaned_lines[-1].strip() == "":
                cleaned_lines.pop()
        cleaned_lines.append(line)

    # Convert back to a single string
    cleaned_template = "\n".join(cleaned_lines)

    # Now perform the replacements
    output = (
        cleaned_template.replace("{{EASY_ROW}}", easy_row)
        .replace("{{MEDIUM_ROW}}", medium_row)
        .replace("{{HARD_ROW}}", hard_row)
        .replace("{{LAST_UPDATED}}", today_str)
    )

    with open(README_PATH, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"📝 README.md generated successfully from template ({today_str})")


if __name__ == "__main__":
    print("📁 Analyzing repo:", REPO_PATH)

    problem_ids = get_problem_ids_in_repo(REPO_PATH)
    problem_map = fetch_leetcode_metadata(expected_ids=problem_ids)

    difficulty_counts, missing_ids = analyze_repo(REPO_PATH, problem_map)
    print_summary(difficulty_counts, label=Path(REPO_PATH).name)

    log_missing_problems(missing_ids)

    generate_chart(
        easy=difficulty_counts.get("easy", 0),
        medium=difficulty_counts.get("medium", 0),
        hard=difficulty_counts.get("hard", 0),
        output_path=CHART_OUTPUT_PATH,
    )

    generate_readme(
        easy=difficulty_counts.get("easy", 0),
        medium=difficulty_counts.get("medium", 0),
        hard=difficulty_counts.get("hard", 0),
    )
