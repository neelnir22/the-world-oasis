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

export async function createCabin(newCabin) {
  // console.log({ newCabin });
  const imageName =
    `${Math.trunc(Math.random() + 1)}-${newCabin.image.name}`.replaceAll(
      "/",
      "",
    );

  //https://zgmpgahwfguutuxxqpjh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error("Cabins data cant be Inserted");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //!why this is null man
  // ! console.log({ data });

  if (storageError) {
    console.log("storageError");
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabins image cant be uploaded and cabin not created");
  }

  return data;
}
