interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

export function Input({
  id,
  onChange,
  value,
  label,
  type,
}: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        autoComplete="off"
        className="block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
      text-neutral-500
      bg-white
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1"
        placeholder=" "
      />
      <label
         htmlFor={id} 
         className="
         absolute 
         text-md
       text-zinc-400
         duration-150 
         transform 
         -translate-y-3 
         scale-75 
         top-4 
         z-10 
         origin-[0] 
         left-6
         peer-placeholder-shown:scale-100 
         peer-placeholder-shown:translate-y-0 
         peer-focus:scale-75
         peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
}
