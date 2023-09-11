export type UserType = {
    id: number;
    userName: string;
    description: string;
    age: number;
    imageUrl: string;
    gender: string;
    country: string;
    dob: string;
}
export type valuesType = {
    first: string;
    age: number;
    gender: string;
    country: string;
    description: string;
}
export type ArrayType = {
    id: number,
    first: string,
    last: string,
    dob: string,
    gender: string,
    email: string,
    picture: string,
    country: string,
    description: string;
    age: number;
}
export type HeaderType = {
    id: number;
    ItemId: { id: string; editingItem: string };
    imageUrl: string;
    enableEditing: Boolean;
    userNameRef: React.RefObject<HTMLInputElement>;
    setValues: any;
    validation: any;
    expandHandler: () => void;
    showExpand: Boolean;
    expandMore: string;
    expandLess: string;
    values: {
        first: string;
        age: number;
        gender: string;
        country: string;
        description: string;
    }
}
export type FooterType = {
    enableEditing: Boolean;
    deleteIcon: string;
    editIcon: string;
    setShowModel: (e: boolean) => void;
    cancelIcon: string;
    save: string;
    cancelHandler: () => void;
    enableSaving: Boolean;
    editRef: React.RefObject<HTMLImageElement>;
    saveClick: () => void;
    editClick: () => void;
    values: {
        first: string;
        age: number;
        gender: string;
        country: string;
        description: string;
    }
}

export type UserDetailsType = {
    enableEditing: Boolean;
    values: {
        first: string;
        age: number;
        gender: string;
        country: string;
        description: string;
    };
    ageRef: React.RefObject<HTMLInputElement>;
    validation: (e: any) => void;
    setValues: (e: any) => void;
    genderRef: React.RefObject<HTMLSelectElement>;
    countryRef: React.RefObject<HTMLInputElement>;
    descriptionRef: React.RefObject<HTMLTextAreaElement>;
}

export type DialogBoxType = {
    show: Boolean;
    setShow: (data: boolean) => void;
    deleteHandler: () => void;
}