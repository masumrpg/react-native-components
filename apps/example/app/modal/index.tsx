import React, { useState } from 'react';
import { ScrollView, View, Text, Switch } from 'react-native';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  ButtonText,
  Card,
  CardContent,
  useTheme,
} from 'rnc-theme';

export default function ModalExample() {
  const { theme } = useTheme();
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [animatedModal, setAnimatedModal] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);
  const [scaleAnimation, setScaleAnimation] = useState(true);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
      }}
    >
      <Text
        style={{
          ...theme.typography.heading,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Modal Examples
      </Text>

      {/* Basic Modal */}
      <Card>
        <CardContent>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Basic Modal
          </Text>
          <Button onPress={() => setBasicModalVisible(true)}>
            <ButtonText>Open Basic Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Card>
        <CardContent>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Confirmation Modal
          </Text>
          <Button onPress={() => setConfirmModalVisible(true)}>
            <ButtonText>Open Confirmation Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Bottom Modal */}
      <Card>
        <CardContent>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Bottom Modal
          </Text>
          <Button onPress={() => setBottomModalVisible(true)}>
            <ButtonText>Open Bottom Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Animation Settings */}
      <Card>
        <CardContent>
          <Text
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Animation Settings
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text
              style={{ ...theme.typography.body, color: theme.colors.text }}
            >
              Slide Animation
            </Text>
            <Switch
              value={slideAnimation}
              onValueChange={(value) => {
                setSlideAnimation(value);
                setScaleAnimation(!value);
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Text
              style={{ ...theme.typography.body, color: theme.colors.text }}
            >
              Scale Animation
            </Text>
            <Switch
              value={scaleAnimation}
              onValueChange={(value) => {
                setScaleAnimation(value);
                setSlideAnimation(!value);
              }}
            />
          </View>

          <Button onPress={() => setAnimatedModal(true)}>
            <ButtonText>Test Animation</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Basic Modal */}
      <Modal
        visible={basicModalVisible}
        onClose={() => setBasicModalVisible(false)}
        size="md"
      >
        <ModalHeader
          title="Basic Modal"
          subtitle="This is a simple modal example"
        />
        <ModalContent>
          <Text style={{ ...theme.typography.body, color: theme.colors.text }}>
            This is the content of the modal. You can put any React Native
            components here. The modal supports different sizes, positions, and
            animations.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            onPress={() => setBasicModalVisible(false)}
            style={{ marginRight: theme.spacing.sm }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button onPress={() => setBasicModalVisible(false)}>
            <ButtonText>OK</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Confirmation Modal - Enhanced */}
      <Modal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        size="sm"
        showCloseButton={false}
        backdropOpacity={0.6}
        animation="scale"
      >
        <ModalHeader
          title="Confirm Action"
          subtitle="Please review your action carefully"
        />
        <ModalContent>
          <Text
            style={{
              ...theme.typography.body,
              color: theme.colors.text,
              lineHeight: 22,
              marginBottom: theme.spacing.sm,
            }}
          >
            Are you sure you want to delete this item?
          </Text>
          <Text
            style={{
              ...theme.typography.small,
              color: theme.colors.textSecondary,
              fontStyle: 'italic',
            }}
          >
            This action cannot be undone.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            onPress={() => setConfirmModalVisible(false)}
            style={{
              flex: 1,
              marginRight: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
            }}
          >
            <ButtonText style={{ fontWeight: '600' }}>Cancel</ButtonText>
          </Button>
          <Button
            variant="error"
            onPress={() => setConfirmModalVisible(false)}
            style={{
              flex: 1,
              borderRadius: theme.borderRadius.lg,
              shadowColor: '#ef4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <ButtonText style={{ fontWeight: '700' }}>Delete</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Bottom Modal */}
      <Modal
        visible={bottomModalVisible}
        onClose={() => setBottomModalVisible(false)}
        size="lg"
        position="bottom"
        animation="slide"
      >
        <ModalHeader title="Bottom Sheet" />
        <ModalContent>
          <Text style={{ ...theme.typography.body, color: theme.colors.text }}>
            This modal slides up from the bottom of the screen, similar to a
            bottom sheet.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button onPress={() => setBottomModalVisible(false)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Animated Modal */}
      <Modal
        visible={animatedModal}
        onClose={() => setAnimatedModal(false)}
        size="md"
        animation={slideAnimation ? 'slide' : 'scale'}
        position="center"
      >
        <ModalHeader
          title={`${slideAnimation ? 'Slide' : 'Scale'} Animation`}
          subtitle="Testing different animation types"
        />
        <ModalContent>
          <Text style={{ ...theme.typography.body, color: theme.colors.text }}>
            This modal demonstrates {slideAnimation ? 'slide' : 'scale'}{' '}
            animation. You can switch between different animation types using
            the settings above.
          </Text>
        </ModalContent>
        <ModalFooter>
          <Button onPress={() => setAnimatedModal(false)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>
    </ScrollView>
  );
}