export const icebergTree = {
  iceberg: [
    { id: "catalog", label: "Catalog pointer", text: "The catalog (REST, Polaris, Unity, Glue) stores one thing per table: the location of the current metadata file. Committing means atomically swapping that pointer." },
    { id: "metadata", label: "metadata.json", text: "Holds the schema with stable column IDs, the partition spec, and the list of snapshots. Stable IDs are why renames and reorders are safe, which was a big fix over Hive." },
    { id: "manifest-list", label: "Manifest list", text: "One per snapshot. Lists the manifests that make up that snapshot, with partition summaries so planners can skip whole manifests." },
    { id: "manifests", label: "Manifests", text: "Each lists data files with per-column stats like min, max and null counts. Query planning reads these instead of listing millions of S3 objects." },
    { id: "data-files", label: "Parquet data files", text: "The actual rows. Columns live as chunks inside row groups, located by each file's footer. This is the layer where backfills and random access get expensive." },
    { id: "deletes", label: "Delete files and v3 deletion vectors", text: "v2 added position and equality delete files. v3 replaced position deletes with deletion vectors, bitmaps that mark removed rows per data file." },
  ],
  lance: [
    { id: "namespace", label: "Namespace", text: "Lance's catalog-level spec. Names tables and nests them in a hierarchy so engines and catalogs can find them." },
    { id: "manifest", label: "Manifest per version", text: "Each commit writes a new immutable manifest through a transaction file. Time travel is built in." },
    { id: "fragments", label: "Fragments", text: "Horizontal slices of rows, stored as lists inside the manifest. Because they are not files, a fragment can gain a new data file when a column is added." },
    { id: "lance-data", label: "Data files per column group", text: "Pages of about 8 MB per column, no row groups, encoding chosen per column. A backfilled column arrives as new data files alongside the old ones." },
    { id: "lance-deletes", label: "Deletion files", text: "Mark removed rows without rewriting data, so indexes stay valid." },
    { id: "indexes", label: "Index files", text: "Vector, full-text and scalar indexes as immutable files referenced by the manifest, split into segments per set of fragments and versioned with the table." },
  ],
  takeaway: "Both formats use snapshot trees, and at the top they look alike. The real difference is below the table layer: how bytes are laid out in files, and whether indexes and blobs are part of the table.",
}
