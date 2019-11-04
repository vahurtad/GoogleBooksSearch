/* eslint-disable no-return-assign */
import React from 'react';
import 'isomorphic-unfetch';
import {
  FormField,
  TextInput,
  Text,
  Button,
  ResponsiveContext,
  Grommet,
  Box,
  Grid,
  Collapsible
} from 'grommet';
import { Favorite } from 'grommet-icons';
import { v1 } from 'grommet-theme-v1';
import Books from '../components/Books';

let listFave = [];
// Code goes here
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.handleFavorites = this.handleFavorites.bind(this);
    this.state = {
      favorite: '',
      value: '',
      enter: false,
      openNotification: false
    };
  }

  handleKeyPress = event => {
    if (event.charCode === 13) {
      this.setState({ enter: true });
    }
  };

  handleFavorites(value) {
    this.setState({ favorite: value });
  }

  render() {
    const { value, enter, favorite, openNotification } = this.state;

    return (
      <Grommet full theme={v1}>
        <Box
          align="center"
          as="header"
          direction="row"
          pad={{ vertical: 'small', horizontal: 'medium' }}
          justify="between"
          background="neutral-3"
          elevation="large"
          style={{ zIndex: '1000' }}
        >
          <FormField label="Search Google Books">
            <TextInput
              placeholder="Type a Search Query"
              value={value}
              onChange={event =>
                this.setState({
                  value: event.target.value,
                  enter: false
                })
              }
              onKeyPress={this.handleKeyPress}
            />
          </FormField>

          <Box flex direction="row">
            <Box flex align="end" justify="center">
              <Button
                icon={<Favorite color="dark-1" />}
                label="Show Favorites"
                hoverIndicator="light-1"
                onClick={() =>
                  this.setState({
                    openNotification: !openNotification
                  })
                }
              />
            </Box>
          </Box>
        </Box>

        <ResponsiveContext.Consumer>
          {() => (
            <Grid align="end" alignContent="end">
              {enter && value !== '' ? (
                <>
                  <Collapsible direction="vertical" open={openNotification}>
                    <Box
                      flex
                      width="xlarge"
                      background="light-2"
                      pad="small"
                      elevation="small"
                    >
                      <Text size="xlarge">Favorites</Text>
                      <Favorites list={[...listFave]} />
                    </Box>
                  </Collapsible>
                  <Books
                    query={value}
                    faves={favorite}
                    onFavoriteChange={this.handleFavorites}
                  />
                  {(listFave = new Set(listFave))}
                  {favorite !== '' ? listFave.add(favorite) : ''}
                </>
              ) : (
                'Nothing To Search'
              )}
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

const Favorites = props => {
  return props.list.map(val => (
    <Box pad="medium" key={val[0]}>
      <Text>{val[1]}</Text>
      <Text>
        {'Author(s): '}
        {val[2]
          ? val[2].map((item, index) => (index ? ', ' : '') + item)
          : 'None'}
      </Text>
      <Text>
        {'Publisher: '}
        {val[3] ? val[3] : 'None'}
      </Text>
    </Box>
  ));
};
