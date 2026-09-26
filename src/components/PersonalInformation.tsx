import { PersonalInformationProps } from "@/lib/types";

export default function PersonalInformation({
    items,
    onChange,
}: PersonalInformationProps) {
    return (
        <>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={items.name}
                placeholder="Enter full name"
                onChange={(e) =>
                    onChange("name", e.target.value)
                }
                required
            />

            <label htmlFor="number">Phone Number</label>
            <input
                type="tel"
                id="number"
                name="number"
                value={items.number}
                placeholder="Enter phone number"
                onChange={(e) =>
                    onChange("number", e.target.value)
                }
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={items.email}
                placeholder="Enter email"
                onChange={(e) =>
                    onChange("email", e.target.value)
                }
                required
            />
        </>
    );
}