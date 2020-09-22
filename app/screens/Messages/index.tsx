import React, { useState } from 'react';
import { FlatList } from 'react-native';

import Screen from '../../shared/Screen';
import {
    ListItem,
    ListItemDeleteAction,
    ListItemSeparator
} from '../../shared/lists';
import Message from './model';
import initialMessages from './constants';

export default function Messages() {
    const [messages, setMessages] = useState(initialMessages);
    const [refreshing, setRefreshing] = useState(false);

    const handleMessageDelete = (message: Message) => {
        // delete the message from messages
        setMessages(prevState => prevState.filter(m => m.id !== message.id));
        // call the server
    };

    return (
        <Screen>
            <FlatList
                data={messages}
                keyExtractor={message => message.id.toString()}
                onRefresh={() => setMessages([messages[1]])}
                refreshing={refreshing}
                renderItem={({ item }) => (
                    <ListItem
                        image={item.image}
                        onPress={() => console.log('Message selected', item)}
                        renderRightActions={() => (
                            <ListItemDeleteAction
                                onPress={() => handleMessageDelete(item)}
                            />
                        )}
                        subtitle={item.description}
                        title={item.title}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
            />
        </Screen>
    );
}