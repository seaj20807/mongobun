export default function App(props) {
    const movieData = props.movies;

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Movies</title>
            </head>
            <body>
                <h1>Welcome!</h1>
                <p>Below you can find a listing of some acclaimed movies (IMDB rating of 8+):</p>
                <button onClick={() => alert('clicked')}>Test</button>
                <p>---</p>
                {movieData.map((movie) => {
                    return <div key={movie._id}>
                        <p>Title: {movie.title}</p>
                        <p>Plot: {movie.plot}</p>
                        <p>Year: {movie.year}</p>
                        <p>IMDB Rating: {movie.imdb.rating}</p>
                        <img src={movie.poster} height={"auto"} width={"20%"} alt="Poster of the movie"></img>
                        <p>---</p>
                    </div>
                })}
            </body>
        </html>
    );
}