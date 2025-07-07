import { StyleSheet } from "react-native";
import { Card, Collapsible, P, useTheme, VStack } from "rnc-theme";

export default function CollapsibleScreen() {
  const {theme} = useTheme();
  return (
    <VStack themed style={styles.container}>
      <Card>
        <Collapsible title="About Superfan Badges">
          <P>
            Superfan badges are given to the most active and dedicated fans. You
            can earn them by interacting often, joining events, and supporting
            your favorite artists consistently.
          </P>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible title="How to Earn Points">
          <P>
            Earn points by liking posts, leaving comments, joining livestreams,
            and participating in fan missions. Points help you climb the
            leaderboard and unlock exclusive perks.
          </P>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible title="What Is a Fandom Level?">
          <P>
            Your fandom level represents your activity and loyalty. The higher
            your level, the more features and rewards you unlock as a fan.
          </P>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible title="Can I Change My Interests Later?">
          <P>
            Yes! You can update your selected topics anytime from the settings
            page. Your feed will adjust based on your preferences.
          </P>
        </Collapsible>
      </Card>
      <Card>
        <Collapsible title="Is This App Free to Use?">
          <P>
            Yes, the core features are completely free. Some optional premium
            features may be available in the future.
          </P>
        </Collapsible>
      </Card>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
});
