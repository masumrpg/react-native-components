import React, { useState } from 'react';
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
  VScroll,
  Typography,
  Box,
  Switcher,
  utils,
} from 'rnc-theme';

export default function ModalScreen() {
  const { theme } = useTheme();
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [animatedModal, setAnimatedModal] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);
  const [scaleAnimation, setScaleAnimation] = useState(true);

  // Size showcase states
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [currentSize, setCurrentSize] = useState<
    'xs' | 'sm' | 'md' | 'lg' | 'xl'
  >('md');

  // Variant showcase states
  const [variantModalVisible, setVariantModalVisible] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'filled'
    | 'ghost'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'destructive'
  >('default');

  const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ];
  const variants: Array<
    | 'default'
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'filled'
    | 'ghost'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'destructive'
  > = [
    'default',
    'primary',
    'secondary',
    'outline',
    'filled',
    'ghost',
    'success',
    'error',
    'warning',
    'info',
    'destructive',
  ];

  return (
    <VScroll
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        padding: theme.spacing.lg,
        gap: theme.spacing.lg,
      }}
    >
      <Typography
        style={{
          ...theme.typography.heading,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Modal Examples
      </Typography>

      {/* Size Comparison */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Size Comparison
          </Typography>
          <Box
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.sm,
            }}
          >
            {sizes.map((size) => (
              <Button
                key={size}
                size="sm"
                variant="outline"
                onPress={() => {
                  setCurrentSize(size);
                  setSizeModalVisible(true);
                }}
              >
                <ButtonText>{size.toUpperCase()}</ButtonText>
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Variant Showcase
          </Typography>
          <Box
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.sm,
            }}
          >
            {variants.map((variant) => (
              <Button
                key={variant}
                size="sm"
                variant={variant === 'default' ? 'primary' : 'outline'}
                onPress={() => {
                  setCurrentVariant(variant);
                  setVariantModalVisible(true);
                }}
              >
                <ButtonText>{variant}</ButtonText>
              </Button>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Basic Modal */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Basic Modal
          </Typography>
          <Button onPress={() => setBasicModalVisible(true)}>
            <ButtonText>Open Basic Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Confirmation Modal
          </Typography>
          <Button onPress={() => setConfirmModalVisible(true)}>
            <ButtonText>Open Confirmation Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Bottom Modal */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Bottom Modal
          </Typography>
          <Button onPress={() => setBottomModalVisible(true)}>
            <ButtonText>Open Bottom Modal</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Animation Settings */}
      <Card>
        <CardContent>
          <Typography
            style={{
              ...theme.typography.title,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Animation Settings
          </Typography>

          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Typography
              style={{ ...theme.typography.body, color: theme.colors.text }}
            >
              Slide Animation
            </Typography>
            <Switcher
              value={slideAnimation}
              onValueChange={(value) => {
                setSlideAnimation(value);
                setScaleAnimation(!value);
              }}
            />
          </Box>

          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Typography
              style={{ ...theme.typography.body, color: theme.colors.text }}
            >
              Scale Animation
            </Typography>
            <Switcher
              value={scaleAnimation}
              onValueChange={(value) => {
                setScaleAnimation(value);
                setSlideAnimation(!value);
              }}
            />
          </Box>

          <Button onPress={() => setAnimatedModal(true)}>
            <ButtonText>Test Animation</ButtonText>
          </Button>
        </CardContent>
      </Card>

      {/* Size Modal */}
      <Modal
        visible={sizeModalVisible}
        onClose={() => setSizeModalVisible(false)}
        size={currentSize}
        variant="primary"
      >
        <ModalHeader
          title={`${currentSize.toUpperCase()} Size Modal`}
          subtitle={`This modal demonstrates the ${currentSize} size`}
        />
        <ModalContent>
          <Typography
            style={{ ...theme.typography.body, color: theme.colors.text }}
          >
            This is a {currentSize} sized modal. You can see how different sizes
            affect the modal dimensions and layout.
          </Typography>
        </ModalContent>
        <ModalFooter>
          <Button onPress={() => setSizeModalVisible(false)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Variant Modal */}
      <Modal
        visible={variantModalVisible}
        onClose={() => setVariantModalVisible(false)}
        size="md"
        variant={currentVariant}
      >
        <ModalHeader
          title={`${
            currentVariant.charAt(0).toUpperCase() + currentVariant.slice(1)
          } Variant`}
          subtitle={`This modal demonstrates the ${currentVariant} variant styling`}
        />
        <ModalContent>
          <Typography
            style={{ ...theme.typography.body, color: theme.colors.text }}
          >
            This modal uses the {currentVariant} variant. Each variant has
            different styling including border colors, background colors, and
            visual emphasis.
          </Typography>
        </ModalContent>
        <ModalFooter>
          <Button
            variant={currentVariant === 'destructive' ? 'error' : 'primary'}
            onPress={() => setVariantModalVisible(false)}
          >
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Basic Modal */}
      <Modal
        visible={basicModalVisible}
        onClose={() => setBasicModalVisible(false)}
        size="md"
        variant="default"
      >
        <ModalHeader
          title="Basic Modal"
          subtitle="This is a simple modal example"
        />
        <ModalContent>
          <Typography
            style={{ ...theme.typography.body, color: theme.colors.text }}
          >
            This is the content of the modal. You can put any React Native
            components here. The modal supports different sizes, positions, and
            animations.
          </Typography>
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
        variant="destructive"
        showCloseButton={false}
        backdropOpacity={0.6}
        animation="scale"
      >
        <ModalHeader
          title="Confirm Action"
          subtitle="Please review your action carefully"
        />
        <ModalContent>
          <Typography
            style={{
              ...theme.typography.body,
              color: theme.colors.text,
              lineHeight: 22,
              marginBottom: theme.spacing.sm,
            }}
          >
            Are you sure you want to delete this item?
          </Typography>
          <Typography
            style={{
              ...theme.typography.small,
              color: theme.colors.textSecondary,
              fontStyle: 'italic',
            }}
          >
            This action cannot be undone.
          </Typography>
        </ModalContent>
        <ModalFooter>
          <Button
            variant="outline"
            onPress={() => setConfirmModalVisible(false)}
            style={{
              flex: 1,
              marginRight: theme.spacing.sm,
              borderRadius: theme.components.borderRadius.lg,
            }}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            variant="destructive"
            onPress={() => setConfirmModalVisible(false)}
            style={{
              flex: 1,
              borderRadius: theme.components.borderRadius.lg,
              ...utils.createShadow(6)
            }}
          >
            <ButtonText>Delete</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>

      {/* Bottom Modal */}
      <Modal
        visible={bottomModalVisible}
        onClose={() => setBottomModalVisible(false)}
        size="lg"
        variant="secondary"
        position="bottom"
        animation="slide"
      >
        <ModalHeader title="Bottom Sheet" />
        <ModalContent>
          <Typography
            style={{ ...theme.typography.body, color: theme.colors.text }}
          >
            This modal slides up from the bottom of the screen, similar to a
            bottom sheet.
          </Typography>
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
        variant="info"
        animation={slideAnimation ? 'slide' : 'scale'}
        position="center"
      >
        <ModalHeader
          title={`${slideAnimation ? 'Slide' : 'Scale'} Animation`}
          subtitle="Testing different animation types"
        />
        <ModalContent>
          <Typography
            style={{ ...theme.typography.body, color: theme.colors.text }}
          >
            This modal demonstrates {slideAnimation ? 'slide' : 'scale'}{' '}
            animation. You can switch between different animation types using
            the settings above.
          </Typography>
        </ModalContent>
        <ModalFooter>
          <Button onPress={() => setAnimatedModal(false)}>
            <ButtonText>Close</ButtonText>
          </Button>
        </ModalFooter>
      </Modal>
    </VScroll>
  );
}
