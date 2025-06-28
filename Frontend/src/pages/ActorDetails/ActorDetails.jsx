import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActorInfo from './ActorInfo';
import ActorMovies from './ActorMovies';
import ActorRecommended from './ActorRecommended';
import Loader from '../../components/Loader';
import { getPersonById } from '../../services/movieApi';

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const res = await getPersonById(id);
        setActor(res.data);
      } catch (error) {
        console.error('Failed to fetch actor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!actor) return <p className="text-center text-red-500 mt-10">Actor not found.</p>;

  return (
    <main className="min-h-screen bg-[#F4EBD3]">
      <ActorInfo actor={actor} />
      <ActorMovies movies={[...(actor.movie_credits?.cast || []), ...(actor.tv_credits?.cast || [])]} />
      <ActorRecommended recommended={actor.combined_credits?.cast || []} setLoading={setLoading} />
    </main>
  );
};

export default ActorDetails;
