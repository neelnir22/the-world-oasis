import supabase from "./Supabase";

// change row level security before using any kind of operations inside supabase

export async function apiCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    `${import.meta.env.VITE_SUPABASE_URL}`,
  );
  // console.log({ newCabin });
  const imageName = `${Math.random() + 1}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be Inserted");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //!why this is null man
  // ! console.log({ data });
  // ? fix this using select().single()

  if (storageError) {
    // console.log("storageError");
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabins image cant be uploaded and cabin not created");
  }

  return data;
}
