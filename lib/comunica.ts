import { QueryEngine } from '@comunica/query-sparql';

export const fun = async () => {
  const queryEngine = new QueryEngine();
  
  const quadStream = await queryEngine.queryQuads(`
    CONSTRUCT WHERE {
      ?s ?p ?o
    } LIMIT 100`, {
    sources: ['http://localhost:3000/alice/'],
  });

  const quads = await quadStream.toArray();

  console.log(quads[0].subject.value);
  console.log(quads[0].predicate.value);
  console.log(quads[0].object.value);
  console.log(quads[0].graph.value);

  /* quadStream.on('data', (quad) => {
    console.log(quad.subject.value);
    console.log(quad.predicate.value);
    console.log(quad.object.value);
    console.log(quad.graph.value);
  });

  quadStream.on('end', () => {
    // The data-listener will not be called anymore once we get here.
  });

  quadStream.on('error', (error) => {
    console.error(error);
  }); */
};
