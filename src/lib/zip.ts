// src/lib/zip.ts

export type ZipLocation = {
  city: string;
  state: string;
  lat: number;
  lon: number;
};

export async function getLocationFromZip(zip: string): Promise<ZipLocation> {
  const response = await fetch(`https://api.zippopotam.us/us/${zip}`);

  if (!response.ok) {
    throw new Error("ZIP_NOT_FOUND");
  }

  const data = await response.json();
  const place = data.places?.[0];

  if (!place) {
    throw new Error("ZIP_NOT_FOUND");
  }

  return {
    city: place["place name"],
    state: place["state abbreviation"],
    lat: Number(place.latitude),
    lon: Number(place.longitude),
  };
}
