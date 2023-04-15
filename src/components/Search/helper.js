const queryCreator = (search, category) => {
    let query

    if(category === "user") query = `/posts?username=${search}`
    if(category === "tag") query = `/posts?tag=${search}`
    if(category === "posts") query = `/posts?title=${search}`

    return query;
}

export default queryCreator;

