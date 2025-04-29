'use client';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function B12DeficiencySymptomsPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Understanding Vitamin B12 Deficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Vitamin B12 deficiency, also known as cobalamin deficiency, occurs when the body doesn't get or absorb enough
            vitamin B12. This can lead to a variety of health issues because B12 plays a crucial role in many bodily
            functions.
          </p>
          <h3 className="text-lg font-semibold mt-4">What Causes B12 Deficiency?</h3>
          <p>
            Several factors can contribute to B12 deficiency, including:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Dietary factors, especially in vegans and vegetarians.</li>
            <li>Malabsorption issues, such as pernicious anemia or gastrointestinal surgery.</li>
            <li>Certain medications that interfere with B12 absorption.</li>
            <li>Age-related decline in the ability to absorb B12.</li>
          </ul>
        </CardContent>
      </Card>
        <Card>
          <CardHeader>
          <CardTitle className="text-2xl font-bold">Common Neurological Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            B12 deficiency can significantly affect the nervous system. Some of the neurological symptoms include:
          </p>
          <div className="mt-2 space-y-2">
            <h4 className="font-semibold">Peripheral Neuropathy</h4>
            <p>Includes symptoms like numbness, tingling, or burning sensations in hands and feet, often described as a 'pins and needles' feeling.</p>
            <h4 className="font-semibold">Balance and Coordination Problems</h4>
            <p>Difficulty with walking, balance, and coordination, indicating nerve damage.</p>
            <h4 className="font-semibold">Cognitive Impairment</h4>
            <p>Memory loss, difficulty concentrating, and overall cognitive decline.</p>
            <h4 className="font-semibold">Mental Confusion</h4>
            <p>Feelings of disorientation, and a general sense of confusion.</p>
          </div>
        </CardContent>
        <p className="mt-4">
          Vitamin B12 is crucial for the production of myelin, the protective sheath around nerves. Without enough B12,
          myelin can degrade, leading to nerve damage and the associated neurological symptoms.
        </p>
      </Card>
        <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Importance of Early Treatment</CardTitle>
        </CardHeader>
        <CardContent>
          <p>It's crucial to address neurological symptoms of B12 deficiency promptly. If left untreated, the nerve damage can become irreversible and lead to permanent disabilities.</p>
      </CardContent>
      </Card>
        <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Gastrointestinal Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>B12 deficiency can cause a range of gastrointestinal issues, including:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Nausea and vomiting</li>
            <li>Loss of appetite</li>
            <li>Weight loss</li>
            <li>Diarrhea or constipation</li>
            <li>Abdominal bloating and gas</li>
            <li>Sore or swollen tongue</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Psychological Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Mental and emotional health can also be affected by B12 deficiency. Psychological symptoms include:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Depression</li>
            <li>Anxiety</li>
            <li>Irritability</li>
            <li>Mood swings</li>
            <li>Difficulty concentrating</li>
            <li>Memory problems</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Other Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <p>B12 deficiency can also manifest in other ways, including:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Fatigue and weakness</li>
            <li>Pale skin</li>
            <li>Headaches</li>
            <li>Heart palpitations</li>
            <li>Shortness of breath</li>
            <li>Dizziness</li>
          </ul>
        </CardContent>
      </Card>  
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">What to Do If You Suspect a Deficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <p>If you suspect you have a B12 deficiency, here are some steps you can take:</p>
          <ul className="list-disc list-inside mt-2">
            <li><strong>Monitor your symptoms:</strong> Keep track of any symptoms you're experiencing and how they evolve.</li>
            <li><strong>Review your diet:</strong> If you're a vegetarian or vegan, consider if you're getting enough B12 from fortified foods or supplements.</li>
            <li><strong>Consider supplements:</strong> Over-the-counter B12 supplements can help, but they may not be suitable for everyone.</li>
            <li><strong>Seek medical advice:</strong> The best way to confirm a B12 deficiency is through a blood test. Consult with a healthcare provider to discuss your symptoms and testing options.</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">When to Seek Medical Attention</CardTitle>
        </CardHeader>
        <CardContent>
          <p>It's important to seek medical attention if:</p>
          <ul className="list-disc list-inside mt-2">
            <li>You have persistent or worsening symptoms of B12 deficiency</li>
            <li>You are experiencing neurological symptoms, such as numbness, tingling, or difficulty with balance</li>
            <li>You are unsure if you are getting enough B12 from your diet</li>
            <li>You are taking medications that may interfere with B12 absorption</li>
            <li>You have any concerns about your health or are at high risk of B12 deficiency</li>
          </ul>
        </CardContent>
      </Card>

    </div>

  );
}
