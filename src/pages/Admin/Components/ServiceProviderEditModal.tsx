import React, { useState, useEffect } from "react";

interface ServiceProvider {
    id: number;
    userId: number;
    name?: string;
    surname?: string;
    city?: string;
    genderName?: string;
    age?: number;
    genderId?: number;
    experienceYears?: number;
    description?: string;
    avatarFile?: string;
    parentCategoryId?: number;
    isActive?: boolean;
    isDeleted?: boolean;
    approvalDate?: string;
    serviceTypes?: number[];    
}

interface Props {
    serviceProvider: ServiceProvider | null;
    onClose: () => void;
    onSave: (updated: ServiceProvider) => void;
}

const EditModal: React.FC<Props> = ({ serviceProvider, onClose, onSave }) => {
    const [formData, setFormData] = useState<ServiceProvider>({ ...serviceProvider! });

    useEffect(() => {
        if (serviceProvider) {
            setFormData({ ...serviceProvider });
        }
    }, [serviceProvider]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = () => {
    //     onSave(formData);
    // };

    const handleSubmit = () => {
        const payload = {
            ...formData,
            serviceTypeIds: formData.serviceTypes || [], // uyğun ad
            genderId: formData.genderId ?? 1,            // default ver
            age: formData.age ?? 18,
            description: formData.description ?? "",
            approvalDate: new Date().toISOString(),      // əgər backend tələb edirsə
            isDeleted: false                             // əgər backend tələb edirsə
        };
        delete payload.serviceTypes; // artıq olan sahəni sil
    
        onSave(payload);
    };
    

    if (!serviceProvider) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[400px]">
                <h2 className="text-xl font-bold mb-4">Edit Service Provider</h2>
                <input name="name" value={formData.name || ""} onChange={handleChange} placeholder="Name" className="w-full mb-2 p-2 border rounded" />
                <input name="surname" value={formData.surname || ""} onChange={handleChange} placeholder="Surname" className="w-full mb-2 p-2 border rounded" />
                <input name="city" value={formData.city || ""} onChange={handleChange} placeholder="City" className="w-full mb-2 p-2 border rounded" />
                <input name="genderName" value={formData.genderName || ""} onChange={handleChange} placeholder="GenderName" className="w-full mb-2 p-2 border rounded" />
                <input name="age" type="number" value={formData.age || ""} onChange={handleChange} placeholder="Age" className="w-full mb-2 p-2 border rounded" />
                <input name="genderId" type="number" value={formData.genderId || ""} onChange={handleChange} placeholder="GenderId" className="w-full mb-2 p-2 border rounded" />
                <input name="experienceYears" type="number" value={formData.experienceYears || ""} onChange={handleChange} placeholder="ExperienceYears" className="w-full mb-2 p-2 border rounded" />
                <input name="description" value={formData.description || ""} onChange={handleChange} placeholder="Desc" className="w-full mb-2 p-2 border rounded" />
                <input name="avatarFile" value={formData.avatarFile || ""} onChange={handleChange} placeholder="AvatarFile" className="w-full mb-2 p-2 border rounded" />
                
                <input name="parentCategoryId" type="number" value={formData.parentCategoryId || ""} onChange={handleChange} placeholder="ParentCategoryId" className="w-full mb-2 p-2 border rounded" />
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive || false}
                        onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                        className="h-4 w-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-gray-800 text-sm">Click for Active</span>
                </label>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isDeleted"
                        checked={formData.isDeleted || false}
                        onChange={e => setFormData({ ...formData, isDeleted: e.target.checked })}
                        className="h-4 w-4 text-blue-600 accent-blue-600"
                    />
                    <span className="text-gray-800 text-sm">Click for tobe Deleted</span>
                </label>


                <input name="approvalDate" value={formData.approvalDate || ""} onChange={handleChange} placeholder="ApprovalDate" className="w-full mb-2 p-2 border rounded" />
                <input name="serviceTypeIds" value={formData.serviceTypes?.join(",") || ""} onChange={(e) => {
                    const value = e.target.value; const array = value.split(",")
                        .map((item) => parseInt(item.trim()))
                        .filter((num) => !isNaN(num)); // yalnız rəqəmləri saxla
                    setFormData({ ...formData, serviceTypes: array });
                }} placeholder="ServiceTypeIds" className="w-full mb-2 p-2 border rounded" />
                <div className="flex justify-end space-x-2">
                    <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
