type Props = {
  title: string;
  lead?: string;
};

export function PageHeader({ title, lead }: Props) {
  return (
    <header className="page-header">
      <div className="container">
        <div className="page-header__inner">
          <h1 className="page-header__title">{title}</h1>
          {lead && <p className="page-header__sub">{lead}</p>}
        </div>
      </div>
    </header>
  );
}
