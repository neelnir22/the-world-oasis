import supabase from "./Supabase";

export async function apiCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be loaded");
  }
  return data;
}
