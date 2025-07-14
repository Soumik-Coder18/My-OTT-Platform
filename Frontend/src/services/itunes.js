// Fetch top 10 music tracks from iTunes Search API for a given query
export async function fetchSongsFromiTunes(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=10`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from iTunes');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('iTunes API error:', error);
    return [];
  }
} 