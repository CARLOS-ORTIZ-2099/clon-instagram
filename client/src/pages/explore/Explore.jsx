import { useEffect, useState } from "react";
import { getPublicationsRandom } from "../../api/publication";
import { Box, Text } from "@chakra-ui/react";
import { ImagesContainer } from "../../components/grid-images-container/ImagesContainer";
import { PublicationImage } from "../../components/publication-image/PublicationImage";
import { Loading } from "../../components/Loading";

export const Explore = () => {
  const [publicationsRandom, setPublicationsRandom] = useState([]);

  useEffect(() => {
    getPublicationsHandler();
  }, []);

  const getPublicationsHandler = async () => {
    const {
      data: { publications },
    } = await getPublicationsRandom();
    console.log(publications);
    setPublicationsRandom(publications);
  };

  if (publicationsRandom.length < 1) return <Loading />;

  return (
    <Box mt={"30px"} textAlign={"center"}>
      <ImagesContainer>
        {publicationsRandom?.length > 0 ? (
          publicationsRandom.map((publication) => (
            <PublicationImage key={publication._id} publication={publication} />
          ))
        ) : (
          <Text> no hay nada para mostrar </Text>
        )}
      </ImagesContainer>
    </Box>
  );
};
