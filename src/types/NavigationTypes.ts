import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Person} from './Person';

export type RootStackParamList = {
  Peoples: undefined;
  Person: {person: Person};
};

export type PersonPageProps = NativeStackScreenProps<
  RootStackParamList,
  'Person'
>;

export type PeoplesPageProps = NativeStackScreenProps<
  RootStackParamList,
  'Peoples'
>;
