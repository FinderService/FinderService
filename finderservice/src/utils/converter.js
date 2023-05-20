const Map = (data, category) => {
  return data.map((pos) => {
    return {
      category,
      type:pos.type,
      reviews:pos.reviews,
      active: pos.active,
      _id: pos._id,
      name: pos.name,
      password: pos.password,
      age: pos.age,
      email: pos.email,
      profilepic: pos.profilepic,
      address: pos.address,
      rating:pos.rating
    };
  });
};

export const converter = (data, category) => {
  if (category === "W") {
    return Map(data, category);
  } else {
    return Map(data, category);
  }
};
