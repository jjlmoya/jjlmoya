export async function resolve(specifier, context, defaultResolve) {
  if (specifier.endsWith('.astro')) {
    return {
      url: specifier.startsWith('file://') ? specifier : `file://${specifier}`,
      format: 'module',
      shortCircuit: true,
    };
  }
  return defaultResolve(specifier, context);
}

export async function load(url, context, defaultLoad) {
  if (url.endsWith('.astro')) {
    return {
      format: 'module',
      source: 'export default {};',
      shortCircuit: true,
    };
  }
  return defaultLoad(url, context);
}
