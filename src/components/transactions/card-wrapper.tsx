import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Kontohändelser</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
