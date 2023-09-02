import React, { useState, useEffect, Fragment } from 'react'
import {
    Avatar
} from '@mui/material';
import { useSelector } from 'react-redux';
import useImageColor from 'use-image-color'
import { useDispatch } from 'react-redux';
import { setGradientColor, setSpotifyMusicList, setPlaylistSelected } from '../redux/reducers/spotifyReducer';
import playlistEndpoints from '../services/endpoints/plyalists';
import { useQuery } from '@tanstack/react-query';
import ricardoImg from '../public/img/00ricardo.jpg'

function SpotifyHeader() {
    const dispatch = useDispatch()
    const [gradientColor, setHeaderGradientColor] = useState("");
    const { playlistSelected } = useSelector((state) => state.spotify)

    const { id, name, owner, tracksReference, type, src, totalPlaylistDuration } = playlistSelected
    const authenticationSettings = JSON.parse(localStorage.getItem('authentication'))
    const { colors } = useImageColor(src, { cors: true, colors: 2 })

    const transformArtistsData = (artists) => {
        return (
            <Fragment >
                {artists.map((art, i) => (
                    <a
                        key={i}
                        className='playlist-owner'
                        target='_blank'
                        rel="noreferrer"
                        href='https://ricardobriceno.netlify.app/'
                    >
                        {`${art.name}${i + 1 !== artists.length ? ', ' : ''}`}
                    </a>
                ))}
            </Fragment>
        )
    }

    const createTrackContent = (src, isPlaying = false, name, artists) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    style={{
                        height: '40px',
                        width: '40px',
                    }}
                    variant='square'
                    src={src.url}
                />
                <div style={{ paddingLeft: '20px' }}>
                    <div style={{
                        paddingBottom: '5px',
                        color: isPlaying ?
                            'var(--spotify-green)' :
                            'var(--spotify-white)'
                    }}>
                        {name}
                    </div>
                    <div style={{
                        color: isPlaying ? 'var(--spotify-white)' : 'var(--spotify-grey)'
                    }}>
                        {transformArtistsData(artists)}
                    </div>
                </div>
            </div>

        )
    }
    const formatDate = (dateString) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const date = new Date(dateString);
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    const prepareData = (playlist) => {
        const songs = playlist.tracks.items
        const tracks = songs.map((t, i) => {
            const track_id = t.track.id
            const name = t.track.name
            const album = t.track.album.name
            const artists = t.track.artists
            const added_at = formatDate(t.added_at)
            const time = t.track.duration_ms / 1000 // transform to miliseconds
            const src = t.track.album.images[0]
            const trk = {
                '#': i + 1,
                track_id: track_id,
                title: createTrackContent(src, false, name, artists),
                name: name,
                album: album,
                artists: artists,
                added_at: added_at,
                time: time,
                formatedTime: formatTimev2(time),
                isPlaying: false,
                src: src,
                saved: false
            }
            return trk
        })
        const totalPlaylistDuration = tracks.reduce((acc, curr) => {
            return acc + curr.time
        }, 0)
        dispatch(setPlaylistSelected({ ...playlistSelected, totalPlaylistDuration: totalPlaylistDuration }))
        dispatch(setSpotifyMusicList(tracks))
    }


    useEffect(() => {
        if (colors) {
            dispatch(setGradientColor(colors))
            setHeaderGradientColor(colors)
        }
    }, [dispatch, colors])


    useQuery({
        queryKey: ['spotify-playlist', id],
        enabled: true, // Enable the query immediately
        queryFn: () => playlistEndpoints.getSelectedPlaylist(authenticationSettings, id),
        onSuccess: (data) => {
            const _data = { ...data }
            prepareData(_data)
            console.log(data)
        }
    });

    // Format time in MM min SS sec format
    const formatTime = (seconds) => {
        if (!isNaN(seconds)) {
            const integerPart = Math.floor(seconds);
            const minutes = Math.floor(integerPart / 60);
            const remainingSeconds = integerPart % 60;

            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(remainingSeconds).padStart(2, '0');

            return `${formattedMinutes} min ${formattedSeconds} sec`;
        }
    };

    // Format time in MM:SS format
    const formatTimev2 = (seconds) => {
        const integerPart = Math.floor(seconds);

        const minutes = Math.floor(integerPart / 60);
        const remainingSeconds = integerPart % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div id={id}
            className='header'
            style={{ background: `linear-gradient(180deg, ${gradientColor[2]} 0%, ${gradientColor[1]} 100%, ${gradientColor[0]} 100%)` }}
        >
            <Avatar
                style={{
                    height: '230px',
                    width: '230px'
                }}
                variant='square'
                src={src}
            />
            <div style={{ paddingLeft: '25px' }}>
                <p style={{ margin: 0 }}>{type.label}</p>
                <h1 style={{
                    fontSize: '100px',
                    marginBottom: '10px',
                    marginTop: '10px',
                    minWidth: '395px',
                    fontWeith: '1000'
                }}>{name}</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        style={{
                            height: '27px',
                            width: '27px'
                        }}
                        variant='circular'
                        src={ricardoImg}
                    />
                    <span style={{ marginLeft: '5px' }}>
                        <a
                            className='playlist-owner'
                            target='_blank'
                            rel="noreferrer"
                            href='https://ricardobriceno.netlify.app/'
                        >
                            {owner} </a> • {new Date().getFullYear()} • {tracksReference.total} {`${tracksReference.total === 1 ? 'songs' : 'song'}`}, {formatTime(totalPlaylistDuration)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SpotifyHeader