type CategoryLoader = { CategorySEO: unknown };

const loaders = import.meta.glob<CategoryLoader>('./loaders/*.ts');

export async function loadCategory(catKey: string): Promise<CategoryLoader> {
    const loader = loaders[`./loaders/${catKey}.ts`];
    if (!loader) throw new Error(`No loader found for category: ${catKey}`);
    return loader();
}
