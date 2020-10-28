import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        {
          movieId: 1,
          title: "Toy Story ",
          year: "1995",
          genres: "Adventure|Animation|Children|Comedy|Fantasy",
        },
        {
          movieId: 2,
          title: "Jumanji ",
          year: "1995",
          genres: "Adventure|Children|Fantasy",
        },
        {
          movieId: 3,
          title: "Grumpier Old Men ",
          year: "1995",
          genres: "Comedy|Romance",
        },
        {
          movieId: 4,
          title: "Waiting to Exhale ",
          year: "1995",
          genres: "Comedy|Drama|Romance",
        },
        {
          movieId: 5,
          title: "Father of the Bride Part II ",
          year: "1995",
          genres: "Comedy",
        },
        {
          movieId: 6,
          title: "Heat ",
          year: "1995",
          genres: "Action|Crime|Thriller",
        },
        {
          movieId: 7,
          title: "Sabrina ",
          year: "1995",
          genres: "Comedy|Romance",
        },
        {
          movieId: 8,
          title: "Tom and Huck ",
          year: "1995",
          genres: "Adventure|Children",
        },
        {
          movieId: 9,
          title: "Sudden Death ",
          year: "1995",
          genres: "Action",
        },
        {
          movieId: 10,
          title: "GoldenEye ",
          year: "1995",
          genres: "Action|Adventure|Thriller",
        },
        {
          movieId: 11,
          title: "American President, The ",
          year: "1995",
          genres: "Comedy|Drama|Romance",
        },
        {
          movieId: 12,
          title: "Dracula: Dead and Loving It ",
          year: "1995",
          genres: "Comedy|Horror",
        },
        {
          movieId: 13,
          title: "Balto ",
          year: "1995",
          genres: "Adventure|Animation|Children",
        },
        { movieId: 14, title: "Nixon ", year: "1995", genres: "Drama" },
        {
          movieId: 15,
          title: "Cutthroat Island ",
          year: "1995",
          genres: "Action|Adventure|Romance",
        },
        {
          movieId: 16,
          title: "Casino ",
          year: "1995",
          genres: "Crime|Drama",
        },
        {
          movieId: 17,
          title: "Sense and Sensibility ",
          year: "1995",
          genres: "Drama|Romance",
        },
        { movieId: 18, title: "Four Rooms ", year: "1995", genres: "Comedy" },
        {
          movieId: 19,
          title: "Ace Ventura: When Nature Calls ",
          year: "1995",
          genres: "Comedy",
        },
        {
          movieId: 20,
          title: "Money Train ",
          year: "1995",
          genres: "Action|Comedy|Crime|Drama|Thriller",
        },
        {
          movieId: 21,
          title: "Get Shorty ",
          year: "1995",
          genres: "Comedy|Crime|Thriller",
        },
        {
          movieId: 22,
          title: "Copycat ",
          year: "1995",
          genres: "Crime|Drama|Horror|Mystery|Thriller",
        },
        {
          movieId: 23,
          title: "Assassins ",
          year: "1995",
          genres: "Action|Crime|Thriller",
        },
        {
          movieId: 24,
          title: "Powder ",
          year: "1995",
          genres: "Drama|Sci-Fi",
        },
        {
          movieId: 25,
          title: "Leaving Las Vegas ",
          year: "1995",
          genres: "Drama|Romance",
        },
        { movieId: 26, title: "Othello ", year: "1995", genres: "Drama" },
        {
          movieId: 27,
          title: "Now and Then ",
          year: "1995",
          genres: "Children|Drama",
        },
        {
          movieId: 28,
          title: "Persuasion ",
          year: "1995",
          genres: "Drama|Romance",
        },
        {
          movieId: 29,
          title: "City of Lost Children, The ",
          year: "Cit\u00e9 des enfants perdus, La ",
          genres: "Adventure|Drama|Fantasy|Mystery|Sci-Fi",
        },
        {
          movieId: 30,
          title: "Shanghai Triad ",
          year: "Yao a yao yao dao waipo qiao ",
          genres: "Crime|Drama",
        },
        {
          movieId: 31,
          title: "Dangerous Minds ",
          year: "1995",
          genres: "Drama",
        },
        {
          movieId: 32,
          title: "Twelve Monkeys ",
          year: "a.k.a. 12 Monkeys ",
          genres: "Mystery|Sci-Fi|Thriller",
        },
        {
          movieId: 33,
          title: "Wings of Courage ",
          year: "1995",
          genres: "Adventure|Romance|IMAX",
        },
        {
          movieId: 34,
          title: "Babe ",
          year: "1995",
          genres: "Children|Drama",
        },
        {
          movieId: 35,
          title: "Carrington ",
          year: "1995",
          genres: "Drama|Romance",
        },
        {
          movieId: 36,
          title: "Dead Man Walking ",
          year: "1995",
          genres: "Crime|Drama",
        },
        {
          movieId: 37,
          title: "Across the Sea of Time ",
          year: "1995",
          genres: "Documentary|IMAX",
        },
        {
          movieId: 38,
          title: "It Takes Two ",
          year: "1995",
          genres: "Children|Comedy",
        },
        {
          movieId: 39,
          title: "Clueless ",
          year: "1995",
          genres: "Comedy|Romance",
        },
        {
          movieId: 40,
          title: "Cry, the Beloved Country ",
          year: "1995",
          genres: "Drama",
        },
        {
          movieId: 41,
          title: "Richard III ",
          year: "1995",
          genres: "Drama|War",
        },
        {
          movieId: 42,
          title: "Dead Presidents ",
          year: "1995",
          genres: "Action|Crime|Drama",
        },
        { movieId: 43, title: "Restoration ", year: "1995", genres: "Drama" },
        {
          movieId: 44,
          title: "Mortal Kombat ",
          year: "1995",
          genres: "Action|Adventure|Fantasy",
        },
        {
          movieId: 45,
          title: "To Die For ",
          year: "1995",
          genres: "Comedy|Drama|Thriller",
        },
        {
          movieId: 46,
          title: "How to Make an American Quilt ",
          year: "1995",
          genres: "Drama|Romance",
        },
        {
          movieId: 47,
          title: "Seven ",
          year: "a.k.a. Se7en ",
          genres: "Mystery|Thriller",
        },
        {
          movieId: 48,
          title: "Pocahontas ",
          year: "1995",
          genres: "Animation|Children|Drama|Musical|Romance",
        },
        {
          movieId: 49,
          title: "When Night Is Falling ",
          year: "1995",
          genres: "Drama|Romance",
        },
        {
          movieId: 50,
          title: "Usual Suspects, The ",
          year: "1995",
          genres: "Crime|Mystery|Thriller",
        },
      ],
      columns: [
        {
          dataField: "movieId",
          text: "Movie ID",
        },
        {
          dataField: "title",
          text: "Movie title",
        },
        {
          dataField: "year",
          text: "Year",
        },
        {
          dataField: "genres",
          text: "Genres",
        },
      ],
    };
  }
  load_data() {}
  componentDidMount() {
    this.load_data();
  }
  render() {
    let data = this.state.data;
    let columns = this.state.columns;
    return (
      <div>
        {columns.length > 0 ? (
          <BootstrapTable
            keyField="id"
            data={this.state.data}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
