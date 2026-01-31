import { DropDownOption } from '@/types/dropdownOptions';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';

interface DropDownProps {
  icon: React.ReactNode;
  options: DropDownOption[];
}

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const DropDown = ({ icon, options }: DropDownProps) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => setVisible((current) => !current);

  const onItemPress = (item: DropDownOption) => {
    item.onPress();
    setVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        {icon}
      </TouchableOpacity>
      {visible && (
        <>
          <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
          <View style={styles.dropdown}>
            <FlatList
              data={options}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-end',
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: -WINDOW_HEIGHT,
    left: -WINDOW_WIDTH,
    width: WINDOW_WIDTH * 3,
    height: WINDOW_HEIGHT * 3,
    backgroundColor: 'transparent',
    zIndex: 5,
  },
  dropdown: {
    position: 'absolute',
    top: 32,
    right: 0,
    backgroundColor: '#ffffff',
    width: 180,
    borderRadius: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: 'hidden',
    zIndex: 1000,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
