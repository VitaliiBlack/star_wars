import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import {StarWarsStore} from '../store/StarWarsStore';
import {observer} from 'mobx-react';

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}
const Pagination = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage) + 1;

  const previousPage = Math.max(1, currentPage);
  const nextPage = Math.min(totalPages - 1, currentPage + 1);

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    StarWarsStore.loadNextPage();
  };

  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    StarWarsStore.loadPreviousPage();
  };

  const handleHome = () => {
    setCurrentPage(1);
    StarWarsStore.resetToFirstPage();
  };

  return (
    <View style={styles.container}>
      <Button
        title1="Previous"
        title2={previousPage.toString()}
        onPress={handlePrevious}
      />
      <Button
        title1="Home"
        title2={totalPages.toString()}
        onPress={handleHome}
      />
      <Button title1="Next" title2={nextPage.toString()} onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 1,
  },
});

export default observer(Pagination);
