type Props = {
  image?: string
}

export default function MinimapView({ image }: Props) {
  if (!image) return <p>No minimap yet</p>

  return (
    <img
      src={`data:image/png;base64,${image}`}
      style={{ width: 250, border: "1px solid #444" }}
    />
  )
}
