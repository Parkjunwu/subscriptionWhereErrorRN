// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { gql, useQuery } from '@apollo/client';
// import { postCreated } from './__generate__/postCreated';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { seeMessage } from './__generate__/seeMessage';

// const SEE_ROOM = gql`
//   query seeMessage {
//     seeMessage {
//       id
//       payload
//     }
//   }
// `;

// const ROOM_UPDATE = gql`
//     subscription postCreated {
//       postCreated {
//         id
//         payload
//       }
//     }
// `;

// const Apps = () => {
//   const {data,loading,subscribeToMore} = useQuery<seeMessage>(SEE_ROOM)
//   console.log(data)
//   console.log(loading)
//   const [sub,setSub] = useState(true);
//   useEffect(()=>{
//     if(!data || !sub) return;
//     subscribeToMore<postCreated>({
//       document:ROOM_UPDATE,
//       updateQuery: (prev, { subscriptionData }) => {
//         console.log(subscriptionData);
//         console.log(prev)
//         if (!subscriptionData.data) return prev;
//         const newFeedItem = subscriptionData.data.postCreated;
//         const newObj = Object.assign({}, prev, {
//           seeMessage: [newFeedItem, ...prev.seeMessage]
//         });
//         /// 여기에 캐시 변경을 추가하면 됨.
//         console.log(newObj);
//         return newObj;
//       }
//     });
//     setSub(false);
//   },[data,sub])

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       {loading && <Text>Loading</Text>}
//       {data && <Text>data</Text>}
//       {data?.seeMessage.map(message => <Text key={message.id}>{message.payload}</Text>)}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default Apps;





import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    id
    payload
    user{
      userName
      avatar
    }
    read
  }
`;


const ROOM_UPDATES = gql`
  subscription roomUpdate($id: Int!) {
    roomUpdate(id:$id) {
      ...MessageFragment
      id
    payload
    user{
      userName
      avatar
    }
    read
    }
  }
  ${MESSAGE_FRAGMENT}
`;

const SEE_MESSAGE = gql`
  query seeMessage($id:Int!) {
    seeMessage(id:$id){
      id
      messages{
        ...MessageFragment
        id
    payload
    user{
      userName
      avatar
    }
    read
      }
    }
  }
 ${MESSAGE_FRAGMENT}
`;

const Room = () => {
  
  const {data,loading,subscribeToMore} = useQuery(SEE_MESSAGE,{
    variables:{
      id:1
    },
  });
  
  const client = useApolloClient()
  const updateQuery= (_, options) => {
    console.log(3)
    // console.log(_)
    // console.log(options)
    const {subscriptionData:{data:{roomUpdate:message}}} = options;
    console.log(4)
    if(message.id){
      const saveGettingSubscriptionMessageToCache = client.cache.writeFragment({
        // id:`Comment:${id}`,
        fragment:gql`
          fragment NewMessage on Message {
            id
            payload
            user{
              userName
              avatar
            }
            read
          }
        `,
        data: message,
      })
      console.log(5)
      client.cache.modify({
        id:`Room:1`,
        fields:{
          messages(prev){
            const existingArray = prev.find(aMessage=>aMessage.__ref === saveGettingSubscriptionMessageToCache.__ref)
            if(existingArray) return prev;
            return [...prev,saveGettingSubscriptionMessageToCache];
          }
        }
      });
    }
    console.log(6)
    return null;
  }

  const [sub,setSub] = useState(true);
  useEffect(()=>{
    if(!data || !sub) return;
    console.log(1)
    subscribeToMore({
      document:ROOM_UPDATES,
      variables:{id:1},
      updateQuery,
    });
    setSub(false);
    console.log(2)
  },[data,sub])

console.log(data)
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {loading && <Text>Loading</Text>}
      {data && <Text>data</Text>}
      {data?.seeMessage.messages.map(single => <Text key={single.id}>{single.payload}</Text>)}
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
export default Room;






  
