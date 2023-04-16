import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, FlatList, Alert }  from 'react-native';

import { styles } from './Styles';

import { Participant } from '../../components/Participant';

export function Home(){
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState('');

    function handleParcipantAdd() {
        if(participants.includes(participantName)){
            return Alert.alert("Participante existente.", " Já existe um participante na lista com o nome informado.");
        }

        setParticipants(prevStates => [...prevStates, participantName]);
        setParticipantName('');
    }
    function handleParcipantRemove(name: string) {
        if(participants.includes(name)){
            return Alert.alert("Deletar.", `Deseja remover o participante ${name} ?`,[
                {
                    text: 'SIM',
                    onPress: () => setParticipants( 
                        prevStates => participants.filter( 
                            participant => participant !== name 
                        )
                    ),
                },
                {
                    text: 'NÃO',
                    style: 'cancel',
                }
            ]);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Projeto</Text>
            <Text style={styles.eventDate}>Sábado, 15 de Abril de 2023</Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nome do participante"
                    placeholderTextColor={"#6B6B6B"}
                    onChangeText={setParticipantName}
                    value={participantName}
                    />
                <TouchableOpacity style={styles.button} onPress={handleParcipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants}
                keyExtractor={ item => item}
                renderItem={({ item }) => (
                    <Participant 
                        key={item}
                        name={item} 
                        onRemove={() => handleParcipantRemove(item)} 
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ () => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? adicione participantes na sua lista de presença
                    </Text>
                )}
            />
        </View>

        
    )
  }