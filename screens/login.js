import React from 'react';

export default function login() {
  return (
    <View style={styles.centeredContainer}>
    <Button
      title="Sign in with Google"
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    />
  </View>
  )
}

