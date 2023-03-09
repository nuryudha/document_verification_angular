export interface ListNasabah {
    noAplikasi: string;
    namaNasabah: string;
    channel: string;
    cfo: string;
    ca: string;
    statusAppr: string;
    statusDocument: StatusDocument[];
    statusDocumentSelected: string;
    insert_by: string;
}

interface StatusDocument {
    value: string;
    view: string;
}
