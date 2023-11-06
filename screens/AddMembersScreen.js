import React, { useState } from 'react'
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AddMembersScreen = ({ friends, setSelectedFriends, selectedFriends}) => {

    const handleFriendClick = (friend) => {
        if (!selectedFriends.includes(friend)) {
            setSelectedFriends([...selectedFriends, friend]);
        } else {
            const updatedFriends = selectedFriends.filter((selectedFriend) => selectedFriend !== friend);
            setSelectedFriends(updatedFriends);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>
                Add members to the group
            </Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {friends.map((friend, index) => (
                <TouchableOpacity key={index} style={styles.friendContainer} onPress={() => handleFriendClick(friend)}>
                    <View style={styles.friendInfo}>
                        <Image source={require('../assets/images/placeholder.png')} style={styles.friendImage} />
                        <Text style={styles.friendLabel}>{friend.name}</Text>
                    </View>
                    {selectedFriends.includes(friend) ? (
                        <Feather name="check-circle" size={20} color="#16A736" />
                    ) : (
                        <AntDesign name="pluscircleo" size={20} color="black" />
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default AddMembersScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: '#FFF'
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        gap: 30
    },
    heading: {
      fontSize: 20,
      fontWeight: 700,
      width: 200, 
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 20
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 250, 
        justifyContent: "space-between",
    },
    friendInfo: {
        flexDirection: "row",
        gap: 15,
        alignItems: 'center' 
    },
    friendImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    friendLabel: {
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: '500',
        color: '#000'
    }
   
});
  
