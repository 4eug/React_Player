import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
// eslint-disable-next-line import/no-cycle
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = ({ song, i }) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingSongDetails || isFetchingRelatedSongs) return;
    <Loader title="Searching song details" />;

    // eslint-disable-next-line consistent-return
    if (error) return <Error />;

    // eslint-disable-next-line consistent-return
    return (
      <div className="flex flex-col">
        <DetailsHeader artistId="" songData={songData} />

        <div className="mb-10">
          <h2 className="text-white text-2xl font-bold">Lyrics:</h2>
          <div className="mt-5">
            {songData?.sections[1].type === 'LYRICS'
              ? songData?.sections[1].text.map((line, i) => (
                <p className="text-gray-400 text-base my-1">{line}</p>
              )) : <p className="text-gray-400 text-base">Sorry, no Lyrics found!</p>}
          </div>
        </div>

        <RelatedSongs
          data={data}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
        />
      </div>
    );
};

export default SongDetails;
