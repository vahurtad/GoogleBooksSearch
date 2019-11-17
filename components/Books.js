import React from 'react';
import 'isomorphic-unfetch';
import { PropTypes } from 'prop-types';
import { Text, Image, Box, Heading, Button } from 'grommet';
import { Help, Update, Favorite } from 'grommet-icons';

const setofFaves = new Set();

export default class Worker extends React.Component {
  constructor(props) {
    super(props);
    this.changeFave = this.changeFave.bind(this);
    this.state = {
      query: '',
      isLoading: true,
      color: 'dark-1'
    };
  }

  componentDidMount() {
    const { query } = this.props;
    try {
      // eslint-disable-next-line no-undef
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
      )
        .then(json => json.json())
        .then(json => this.setState({ query: json, isLoading: false }));
    } catch (e) {
      console.log('componentDidMount', 'error', e);
    }
  }

  changeFave(value) {
    this.props.onFavoriteChange(value);
    this.setState({ color: 'red' });
    setofFaves.add(value[0]);
  }

  render() {
    const { query, isLoading, color } = this.state;

    return !isLoading ? (
      <>
        {query.items.map(v => (
          <Box direction="row" key={v.id} align="center" pad="large">
            <Box pad="small" background="dark-3">
              {v.volumeInfo.imageLinks ? (
                <Image
                  fit="cover"
                  src={v.volumeInfo.imageLinks.smallThumbnail}
                />
              ) : (
                <Help size="large" color="#e02438" />
              )}
            </Box>
            <Box pad="medium" background="light-3">
              <Heading level={3}>{v.volumeInfo.title}</Heading>
              <Text>
                {'Author(s): '}
                {v.volumeInfo.authors
                  ? v.volumeInfo.authors.map(
                      (item, index) => (index ? ', ' : '') + item
                    )
                  : 'None'}
              </Text>
              <Text>
                {'Publisher: '}
                {v.volumeInfo.publisher ? v.volumeInfo.publisher : 'None'}
              </Text>
            </Box>
            <Button
              icon={
                <Favorite
                  color={[...setofFaves].includes(v.id) ? 'red' : 'dark-1'}
                />
              }
              plain
              hoverIndicator="light-1"
              onClick={() =>
                this.changeFave([
                  v.id,
                  v.volumeInfo.title,
                  v.volumeInfo.authors,
                  v.volumeInfo.publisher
                ])
              }
            />
          </Box>
        ))}
      </>
    ) : (
      <Loading />
    );
  }
}
const Loading = () => (
  <Box full="vertical" justify="center" align="center">
    <Update color="#e02438" />
  </Box>
);

Worker.propTypes = {
  query: PropTypes.arrayOf
};
