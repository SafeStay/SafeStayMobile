import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Crime, CrimeMapProps } from './Interface';

const CrimeMap: React.FC<CrimeMapProps> = ({ latitude, longitude }) => {
  const [streetCrimes, setStreetCrimes] = useState<Crime[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreetCrimes = async () => {
      try {
        const response = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=51.509865&lng=-0.118092`);
        if (!response.ok) {
          throw new Error('Failed to fetch street crimes');
        }
        const data: Crime[] = await response.json();
        setStreetCrimes(data);
      } catch (error) {
        console.error('Error fetching street crimes:', error);
        setError((error as Error).message || 'An error occurred');
      }
    };

    fetchStreetCrimes();
  }, [latitude, longitude]);

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View>
        <Text>Street Crimes</Text>
        {streetCrimes.map(crime => (
          <View key={crime.persistent_id}>
            <Text>Category: {crime.category}</Text>
            <Text>Location: {crime.location.street.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CrimeMap;
