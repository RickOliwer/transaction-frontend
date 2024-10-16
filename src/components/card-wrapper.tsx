import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Kontohändelser</CardTitle>

        <div>Hello world</div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
