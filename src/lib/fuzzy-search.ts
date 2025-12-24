/**
 * Fuzzy search implementation for command palette
 * Matches partial strings and calculates relevance scores
 */

export interface FuzzyMatch<T> {
  item: T;
  score: number;
  matches: number[];
}

/**
 * Calculate fuzzy match score between query and target string
 * Returns score from 0-100, where 100 is perfect match
 */
export function fuzzyScore(query: string, target: string): number {
  const queryLower = query.toLowerCase();
  const targetLower = target.toLowerCase();

  // Exact match gets highest score
  if (targetLower === queryLower) {
    return 100;
  }

  // Starts with query gets high score
  if (targetLower.startsWith(queryLower)) {
    return 90;
  }

  // Contains query as substring gets good score
  if (targetLower.includes(queryLower)) {
    return 80;
  }

  // Fuzzy matching - check if all query characters appear in order
  let queryIndex = 0;
  let targetIndex = 0;
  let matchCount = 0;
  let consecutiveMatches = 0;
  let maxConsecutive = 0;

  while (queryIndex < queryLower.length && targetIndex < targetLower.length) {
    if (queryLower[queryIndex] === targetLower[targetIndex]) {
      matchCount++;
      consecutiveMatches++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
      queryIndex++;
    } else {
      consecutiveMatches = 0;
    }
    targetIndex++;
  }

  // If not all characters matched, return 0
  if (matchCount < queryLower.length) {
    return 0;
  }

  // Calculate score based on match quality
  const matchRatio = matchCount / queryLower.length;
  const consecutiveBonus = (maxConsecutive / queryLower.length) * 20;
  const lengthPenalty = (targetLower.length - queryLower.length) / targetLower.length * 10;

  return Math.max(0, Math.min(100, matchRatio * 50 + consecutiveBonus - lengthPenalty));
}

/**
 * Search through array of items using fuzzy matching
 */
export function fuzzySearch<T>(
  query: string,
  items: T[],
  getText: (item: T) => string,
  threshold: number = 30
): FuzzyMatch<T>[] {
  if (!query || query.trim().length === 0) {
    return items.map(item => ({ item, score: 100, matches: [] }));
  }

  const results: FuzzyMatch<T>[] = [];

  for (const item of items) {
    const text = getText(item);
    const score = fuzzyScore(query, text);

    if (score >= threshold) {
      // Find match positions for highlighting
      const matches = findMatchPositions(query.toLowerCase(), text.toLowerCase());
      results.push({ item, score, matches });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Find positions of matched characters for highlighting
 */
function findMatchPositions(query: string, target: string): number[] {
  const positions: number[] = [];
  let queryIndex = 0;
  let targetIndex = 0;

  while (queryIndex < query.length && targetIndex < target.length) {
    if (query[queryIndex] === target[targetIndex]) {
      positions.push(targetIndex);
      queryIndex++;
    }
    targetIndex++;
  }

  return positions;
}

/**
 * Highlight matched characters in text
 * Returns array of text segments with match indicators
 */
export interface HighlightSegment {
  text: string;
  isMatch: boolean;
}

export function highlightMatches(text: string, matches: number[]): HighlightSegment[] {
  if (matches.length === 0) {
    return [{ text, isMatch: false }];
  }

  const result: HighlightSegment[] = [];
  let lastIndex = 0;

  matches.forEach((matchIndex) => {
    // Add text before match
    if (matchIndex > lastIndex) {
      result.push({
        text: text.substring(lastIndex, matchIndex),
        isMatch: false,
      });
    }

    // Add matched character
    result.push({
      text: text[matchIndex],
      isMatch: true,
    });

    lastIndex = matchIndex + 1;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    result.push({
      text: text.substring(lastIndex),
      isMatch: false,
    });
  }

  return result;
}

/**
 * Multi-field fuzzy search
 * Searches across multiple fields and returns best match
 */
export function fuzzySearchMultiField<T>(
  query: string,
  items: T[],
  fields: Array<(item: T) => string>,
  threshold: number = 30
): FuzzyMatch<T>[] {
  if (!query || query.trim().length === 0) {
    return items.map(item => ({ item, score: 100, matches: [] }));
  }

  const results: FuzzyMatch<T>[] = [];

  for (const item of items) {
    let bestScore = 0;
    let bestMatches: number[] = [];

    // Try each field and keep best score
    for (const getField of fields) {
      const text = getField(item);
      const score = fuzzyScore(query, text);

      if (score > bestScore) {
        bestScore = score;
        bestMatches = findMatchPositions(query.toLowerCase(), text.toLowerCase());
      }
    }

    if (bestScore >= threshold) {
      results.push({ item, score: bestScore, matches: bestMatches });
    }
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
