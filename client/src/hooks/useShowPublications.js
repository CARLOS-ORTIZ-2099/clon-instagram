/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { getPublications } from "../api/publication";

export const useShowPublications = () => {
  const refButton = useRef(null);
  const [publications, setPublications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    // este observador detectara cuando suceda alguna interseccion de un elemento con un elemento ancestro o con el viewport
    // console.log("observando");
    const observer = new IntersectionObserver(observerfunction);
    // aqui solo asignamos el observador si previamente se creo el observador y si existe una referencia al boton a observar
    if (observer && refButton.current) {
      // aqui definimos el elemento a observar
      // el callback que indicamos al observador será ejecutado ahora por primera vez
      observer.observe(refButton.current);
    }
    //console.log('publications');
    // funcion para limpiar el observador
    return () => {
      //console.log("limpiando");
      // desuscribiendo del observador
      if (observer) {
        observer.disconnect();
      }
    };
  }, [publications, pending]);

  // esta funcion se ejecutara cuando halla una interseccion
  // la primera vez que se asigne el elemento a observar
  async function observerfunction(entries) {
    // el entri es el objeto de opciones del observador
    //console.log(entries[0]);
    const firstEntry = entries[0];
    // la propiedad isIntersecting me devuelve un booleano indicando si hubo o no una interseccion
    if (firstEntry.isIntersecting && hasMore && !pending) {
      //console.log("hubo interseccion");
      await getPublicationsHandler();
    }
  }

  const getPublicationsHandler = async () => {
    // apenas ejecutamos la funcion pasamos a estado pendiente
    // esto lo hacemos por que mientras estamos en modo pendiente
    // haciendo una solicitud no podemos hacer otra auque halla una interseccion
    setPending(true);
    //console.log("entro");
    try {
      const response = await getPublications(publications.length);
      //console.log(response);
      if (response.data.publications.length === 0) {
        setHasMore(false);
      } else {
        setTimeout(() => {
          setPublications((previous) => [
            ...previous,
            ...response.data.publications,
          ]);
          setPending(false); // aqui ya no tenemos tareas pendientes
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { publications, hasMore, refButton };
};
/* la funcion de limpieza de react se ejcuta en 2 situaciones, cuando se
   desmonte el componente y cuando alguno de los elementos de su lista de
   dependecnia cambie, antes de ejecutar el efecto de nuevo
*/
