import { useEffect, useState } from "react";
import { getPublicationsRandom } from "../../api/publication";
import { Box, Text } from "@chakra-ui/react";
import { ImagesContainer } from "../../components/grid-images-container/ImagesContainer";
import { PublicationImage } from "../../components/publication-image/PublicationImage";
import { Loading } from "../../components/loading/Loading";

export const Explore = () => {
  const [publicationsRandom, setPublicationsRandom] = useState(null);

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

  if (!publicationsRandom) return <Loading />;

  return (
    <Box mt={"30px"} textAlign={"center"}>
      <ImagesContainer>
        {publicationsRandom?.length > 0 ? (
          publicationsRandom.map((publication) => (
            <PublicationImage key={publication._id} publication={publication} />
          ))
        ) : (
          <Text fontSize={"xl"} color={"#4cb5f9"}>
            no hay nada para mostrar
          </Text>
        )}
      </ImagesContainer>
    </Box>
  );
};
