import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { postCreated } from './__generate__/postCreated';
import { useEffect } from 'react';
import { useState } from 'react';
import { seeMessage } from './__generate__/seeMessage';

const SEE_ROOM = gql`
  query seeMessage {
    seeMessage {
      id
      payload
    }
  }
`;

const ROOM_UPDATE = gql`
    subscription postCreated {
      postCreated {
        id
        payload
      }
    }
`;

const Apps = () => {
  const {data,loading,subscribeToMore} = useQuery<seeMessage>(SEE_ROOM)
  console.log(data)
  console.log(loading)
  const [sub,setSub] = useState(true);
  useEffect(()=>{
    if(!data || !sub) return;
    subscribeToMore<postCreated>({
      document:ROOM_UPDATE,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        console.log(prev)
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.postCreated;
        const newObj = Object.assign({}, prev, {
          seeMessage: [newFeedItem, ...prev.seeMessage]
        });
        /// 여기에 캐시 변경을 추가하면 됨.
        console.log(newObj);
        return newObj;
      }
    });
    setSub(false);
  },[data,sub])
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {loading && <Text>Loading</Text>}
      {data && <Text>data</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Apps;