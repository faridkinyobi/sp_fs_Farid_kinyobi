import React from 'react';
import { HeaderProject } from './features/components/HeaderContaint';
import ListProject from './features/components/ListProject';

export default async function page() {
  await new Promise((resolve) =>
    setTimeout(() => resolve('internal delay'), 400),
  );
  return (
    <div className="space-y-10">
      <HeaderProject titleLink="New Projeck" title="project" />
      <ListProject />
    </div>
  );
}
