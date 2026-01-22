import { DropDownOption } from '@/types/dropdownOptions';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface DropDownProps {
  icon: React.ReactNode;
  options: DropDownOption[];
}

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
  dropdown: {
    position: 'absolute',
    top: 32,
    right: 0,
    backgroundColor: '#ffffff',
    width: 180,
    borderRadius: 12,
    // Sombras para Android/iOS
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    overflow: 'hidden', // Garante que o efeito de clique respeite o border radius
    zIndex: 10,
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
