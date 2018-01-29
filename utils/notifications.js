import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'FlashCards:notifications'


export function clearDailyNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function addNotification () {
    return {
        title: 'Fazer o Quiz!',
        body: "VocÊ já fez o seu quiz hoje?",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
        }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let dateSchedule = new Date()
                            dateSchedule.setDate(dateSchedule.getDate() + 1)
                            dateSchedule.setHours(20)
                            dateSchedule.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                addNotification(),
                                {
                                    time: dateSchedule,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}