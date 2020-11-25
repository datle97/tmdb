import { Container, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchCollection } from "../../api";
import Loading from "../common/Loading";
import MovieCard from "../common/MovieCard";
import Details from "../TvMovie/Details";

const CollectionPage = ({ match }) => {
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = match.params;
  useEffect(() => {
    const fetchData = async () => {
      setCollection(await fetchCollection(id));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Details details={collection} />
      <Container>
        <Typography variant="h6" gutterBottom>
          {collection.parts.length} movies
        </Typography>
        {collection.parts.map((movie) => (
          <MovieCard key={movie.id} details={movie} />
        ))}
      </Container>
    </div>
  );
};

export default CollectionPage;
