interface ApiResponse {
  slip: {
    advice: string;
    id: number;
  };
}

export async function getData(url: string): Promise<ApiResponse> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `HTTP ${response.status}: ${errorData.message || response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Network error:", error);
    throw error;
  }
}
