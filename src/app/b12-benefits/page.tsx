
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function B12BenefitsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-center">Benefits of Vitamin B12</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nerve Function</CardTitle>
          <CardDescription>
            Vitamin B12 is crucial for maintaining healthy nerve function.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            B12 plays a key role in the production of myelin, a protective sheath that covers nerves. This insulation allows for efficient nerve impulse transmission.
          </p>
          <p>
          Adequate B12 intake helps prevent nerve damage and ensures proper signaling throughout the nervous system.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Red Blood Cell Formation</CardTitle>
          <CardDescription>
            B12 is essential for the production of healthy red blood cells.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Vitamin B12 is a vital nutrient for the bone marrow to produce red blood cells effectively.
          </p>
          <p>
            Without enough B12, red blood cells can become abnormally large and unable to carry oxygen efficiently, leading to anemia.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DNA Synthesis</CardTitle>
          <CardDescription>
            Vitamin B12 is critical for DNA synthesis and cell division.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            B12 is a key cofactor in the synthesis of DNA, the genetic material found in every cell.
          </p>
          <p>
            It supports proper cell division and replication, which is vital for growth and repair.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Energy Production</CardTitle>
          <CardDescription>
            Vitamin B12 plays a role in energy metabolism.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
           B12 is a crucial part of the processes that convert carbohydrates into glucose, which your body uses for energy.
          </p>
          <p>
           Adequate levels of B12 are needed to maintain energy levels and prevent fatigue.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brain Health</CardTitle>
          <CardDescription>
            B12 is essential for optimal brain health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
           Vitamin B12 plays a critical role in cognitive functions such as memory, learning, and concentration.
          </p>
          <p>
          Deficiencies in B12 have been linked to cognitive decline, and proper B12 levels are associated with better cognitive health.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mood Regulation</CardTitle>
          <CardDescription>
            B12 may impact mood and emotional well-being.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Vitamin B12 contributes to the synthesis of neurotransmitters, chemical messengers that regulate mood.
          </p>
          <p>
           Adequate levels of B12 may help reduce the risk of mood disturbances and support emotional well-being.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Benefits</CardTitle>
          <CardDescription>
            Additional benefits of Vitamin B12.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            <li>
              <strong>Cell Growth and Repair:</strong> B12 supports cell replication and renewal.
            </li>
            <li>
              <strong>Cardiovascular Health:</strong> It may help in regulating homocysteine levels, supporting heart health.
            </li>
            <li>
              <strong>Digestive Health:</strong> Adequate B12 levels support the digestive process.
            </li>
          </ul>
        </CardContent>
      </Card>
        <Card className="mt-8">
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Disclaimer: The content provided is for informational purposes
              only and is not a substitute for professional medical advice. Consult a healthcare provider for diagnosis and treatment.
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
