type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

/**
 * Type Inferable Object.entries
 * https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
 */
export const objectEntries = (
  <T extends object>(obj: T) => Object.entries(obj) as Entries<T>
)
